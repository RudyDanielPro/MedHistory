import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { useState } from "react";

export function Contact () {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [toast, setToast] = useState({ show: false, title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setToast({
      show: true,
      title: "Mensaje enviado",
      description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
    });
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, title: "", description: "" });
    }, 3000);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqItems = [
    {
      question: "¿Cómo me registro como doctor?",
      answer: "Para registrarte como doctor necesitas un código de verificación médica que se proporciona a través de la administración. Contacta con nosotros para obtener tu código."
    },
    {
      question: "¿Qué información necesito para realizar una consulta?",
      answer: "Necesitas los datos completos del paciente (nombre, CI, edad, peso, síntomas) y tu evaluación médica detallada incluyendo diagnóstico y tratamiento propuesto."
    },
    {
      question: "¿Cómo recibo las evaluaciones de los doctores?",
      answer: "Recibirás notificaciones automáticas cuando un doctor evalúe tu consulta. Puedes ver la calificación y comentarios en tu dashboard."
    },
    {
      question: "¿Es segura la plataforma para datos médicos?",
      answer: "Sí, utilizamos encriptación de datos y cumplimos con estándares internacionales de seguridad médica para proteger toda la información."
    },
    {
      question: "¿Puedo acceder desde dispositivos móviles?",
      answer: "Absolutamente. MedHistory está optimizada para funcionar perfectamente en computadoras, tablets y smartphones."
    }
  ];


    return (
        <>
        <Header/>
      
      {/* Contacto */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            <i className="fas fa-envelope mr-4"></i>        {/*Icono de mensaje*/}
            Contacto
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para apoyarte 
            en tu experiencia con MedHistory.
          </p>
        </div>
      </section>

      {/*Contact Form and Info*/}
      <section className="py-16 bg-form-bg-color">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="medical-card p-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  <i className="fas fa-paper-plane mr-3 text-primary"></i>
                  Envíanos un mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Asunto
                  </label>
                  <select 
                    value={formData.subject} 
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte-tecnico">Soporte Técnico</option>
                    <option value="registro-doctor">Registro como Doctor</option>
                    <option value="dudas-plataforma">Dudas sobre la Plataforma</option>
                    <option value="sugerencias">Sugerencias</option>
                    <option value="reportar-problema">Reportar Problema</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[120px]"
                    placeholder="Describe tu consulta o mensaje..."
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Enviar mensaje
                </button>
              </form>
		          </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="medical-card p-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  <i className="fas fa-info-circle mr-3 text-primary"></i>
                  Información de contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Correo electrónico</h3>
                      <p className="text-muted-foreground">mendez10dev@gmail.com</p>
                      <p className="text-muted-foreground">rudy@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-accent text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                      <p className="text-muted-foreground">+53 58-03-07-95</p>
                      <p className="text-muted-foreground">+53 56-49-85-46</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-secondary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horario de atención</h3>
                      <p className="text-muted-foreground">Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sábados: 9:00 AM - 2:00 PM</p>
                      <p className="text-muted-foreground">Domingos: Cerrado</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-university text-primary text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Institución</h3>
                      <p className="text-muted-foreground">Universidad de las Ciencias Informáticas</p>
                      <p className="text-muted-foreground">La Habana, Cuba</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enlaces rápidos */}
              <div className="medical-card p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  <i className="fas fa-external-link-alt mr-2 text-accent"></i>
                  Enlaces rápidos
                </h3>
                <div className="space-y-3">
                  <a href="/register" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <i className="fas fa-user-plus mr-2"></i>
                    Registrarse en la plataforma
                  </a>
                  <a href="/terms" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <i className="fas fa-file-contract mr-2"></i>
                    Términos y condiciones
                  </a>
                  <a href="/privacy" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <i className="fas fa-shield-alt mr-2"></i>
                    Política de privacidad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              <i className="fas fa-question-circle mr-3 text-primary"></i>
              Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Frecuentes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre MedHistory.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="medical-card px-6">
                  <details className="group">
                    <summary className="flex justify-between items-center font-semibold cursor-pointer list-none py-4">
                      <span>{item.question}</span>
                      <span className="transition group-open:rotate-180">
                        <i className="fas fa-chevron-down text-primary"></i>
                      </span>
                    </summary>
                    <div className="pb-4 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        
      <Footer/>
        </>
    )
}