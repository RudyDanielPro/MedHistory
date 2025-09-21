import { endpoint } from './endpoint.js';
import { parseJwt } from './utils.js';

class ApiService {
  async getStudentNotifications() {
    try {
      const response = await this.makeRequest('/notifications');
      const notifications = response.message || [];
      return notifications.map(this.transformNotification);
    } catch (error) {
      console.error('Error fetching student notifications:', error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId) {
    try {
      const response = await this.makeRequest(`/notifications/${notificationId}`, {
        method: 'PUT',
        body: JSON.stringify({ read: 1 })
      });
      return response;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
  constructor() {
    this.baseURL = endpoint;
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  getUserId() {
    const token = this.getAuthToken();
    if (!token) return null;
    
    const decoded = parseJwt(token);
    return decoded?.id || decoded?.userId || null;
  }

  async makeRequest(url, options = {}) {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    if (options.body) {
      headers['Content-Type'] = 'application/json';
    }

    const defaultOptions = {
      headers
    };

    const response = await fetch(`${this.baseURL}${url}`, {
      ...defaultOptions,
      ...options
    });

    if (!response.ok) {
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If can't parse JSON, use default message
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  async getDoctorDocuments(doctorId) {
    try {
      const response = await this.makeRequest(`/documents/doctor/${doctorId}`);
      return response.message || response.data || response;
    } catch (error) {
      console.error('Error fetching doctor documents:', error);
      throw error;
    }
  }

  async gradeDocument(documentId, gradeData) {
    try {
      const response = await this.makeRequest(`/documents/grade/${documentId}`, {
        method: 'POST',
        body: JSON.stringify({
          grade: gradeData.grade,
          evaluationCriteria: gradeData.evaluationCriteria || {},
          diagnosticCorrection: gradeData.diagnosticCorrection || {}
        })
      });
      return response;
    } catch (error) {
      console.error('Error grading document:', error);
      throw error;
    }
  }

  async getDocumentNotes(documentId) {
    try {
      const response = await this.makeRequest(`/documents/notes/${documentId}`);
      return response.message || response.data || response;
    } catch (error) {
      console.error('Error fetching document notes:', error);
      throw error;
    }
  }

  async getCurrentDoctorDocuments() {
    const doctorId = this.getUserId();
    if (!doctorId) {
      throw new Error('No doctor ID found in token');
    }
    return this.getDoctorDocuments(doctorId);
  }

  async getStudentDocuments(studentId) {
    try {
      const response = await this.makeRequest(`/documents/student/${studentId}`);
      return response.message || response.data || response;
    } catch (error) {
      console.error('Error fetching student documents:', error);
      throw error;
    }
  }

  async getCurrentStudentDocuments() {
    const studentId = this.getUserId();
    if (!studentId) {
      throw new Error('No student ID found in token');
    }
    return this.getStudentDocuments(studentId);
  }

  transformDocument(document) {
    return ApiService.transformDocumentData(document);
  }

  transformNotification(notification) {
    const payload = notification.payload || {};
    return {
      id: notification.id,
      title: payload.title || 'Notificación',
      message: payload.message || '',
      date: notification.createdAt,
      read: notification.read === 1
    };
  }

  static transformDocumentData(document) {
    const content = document.content || {};
    
    return {
      id: document.id,
      studentName: content.studentName || 'N/A',
      studentEmail: content.studentEmail || 'N/A',
      patientName: content.patientName || 'N/A',
      patientCI: content.patientCI || 'N/A',
      patientAge: content.patientAge || 'N/A',
      patientSex: content.patientSex || 'N/A',
      patientWeight: content.patientWeight || 'N/A',
      patientPhone: content.patientPhone || 'N/A',
      symptoms: content.symptoms || 'N/A',
      conditions: content.conditions || 'N/A',
      allergies: content.allergies || 'N/A',
      medications: content.medications || 'N/A',
      observations: content.observations || 'N/A',
      diagnosis: content.diagnosis || 'N/A',
      treatment: content.treatment || 'N/A',
      submittedDate: document.createdAt,
      evaluatedDate: document.updatedAt
    };
  }

  static calculatePriority(createdAt) {
    const now = new Date();
    const created = new Date(createdAt);
    const diffHours = (now - created) / (1000 * 60 * 60);
    
    if (diffHours <= 24) return 'Alta';
    if (diffHours <= 48) return 'Media';
    return 'Baja';
  }

  async getDocumentsWithMetadata() {
    const documents = await this.getCurrentDoctorDocuments();
    
    const documentsWithNotes = await Promise.all(
      documents.map(async (doc) => {
        try {
          const notes = await this.getDocumentNotes(doc.id);
          const transformed = ApiService.transformDocumentData(doc);
          return {
            ...transformed,
            priority: ApiService.calculatePriority(doc.createdAt),
            isEvaluated: notes && notes.length > 0,
            latestNote: notes && notes.length > 0 ? notes[notes.length - 1] : null
          };
        } catch (notesError) {
          console.log('No notes found for document:', doc.id, notesError.message);
          const transformed = ApiService.transformDocumentData(doc);
          return {
            ...transformed,
            priority: ApiService.calculatePriority(doc.createdAt),
            isEvaluated: false,
            latestNote: null
          };
        }
      })
    );
    
    return documentsWithNotes;
  }

  async getStudentDocumentsWithNotes() {
    const documents = await this.getCurrentStudentDocuments();
    
    const documentsWithNotes = await Promise.all(
      documents.map(async (doc) => {
        try {
          const notes = await this.getDocumentNotes(doc.id);
          const transformed = ApiService.transformDocumentData(doc);
          return {
            ...transformed,
            isEvaluated: notes && notes.length > 0,
            notes: notes || [], // All notes, not just the latest
            averageGrade: notes && notes.length > 0 
              ? (notes.reduce((sum, note) => sum + note.grade, 0) / notes.length).toFixed(1)
              : null
          };
        } catch (notesError) {
          console.log('No notes found for document:', doc.id, notesError.message);
          const transformed = ApiService.transformDocumentData(doc);
          return {
            ...transformed,
            isEvaluated: false,
            notes: [],
            averageGrade: null
          };
        }
      })
    );
    
    return documentsWithNotes;
  }

  async getDocumentsByStatus() {
    const documentsWithNotes = await this.getDocumentsWithMetadata();
    
    const pending = documentsWithNotes.filter(doc => !doc.isEvaluated);
    const evaluated = documentsWithNotes.filter(doc => doc.isEvaluated);
    
    return { pending, evaluated };
  }

  async getStudentStats() {
    const documents = await this.getStudentDocumentsWithNotes();
    
    const totalConsultations = documents.length;
    const evaluatedConsultations = documents.filter(doc => doc.isEvaluated);
    const pendingConsultations = documents.filter(doc => !doc.isEvaluated);
    
    const allGrades = [];
    evaluatedConsultations.forEach(doc => {
      doc.notes.forEach(note => {
        allGrades.push(note.grade);
      });
    });
    
    const overallAverage = allGrades.length > 0 
      ? (allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length).toFixed(1)
      : "0";
    
    const uniqueDoctors = new Set();
    evaluatedConsultations.forEach(doc => {
      doc.notes.forEach(note => {
        if (note.doctorId) {
          uniqueDoctors.add(note.doctorId);
        }
      });
    });
    
    return {
      totalConsultations,
      evaluatedCount: evaluatedConsultations.length,
      pendingCount: pendingConsultations.length,
      overallAverage,
      uniqueDoctorsCount: uniqueDoctors.size
    };
  }

  async getAllUsers() {
    try {
      const response = await this.makeRequest('/users');
      return response.users || response.data || response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.makeRequest(`/user/${userId}`, {
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const response = await this.makeRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

export default new ApiService();