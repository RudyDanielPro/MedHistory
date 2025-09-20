import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="h-full p-6 transition-transform duration-300 medical-card hover:scale-105">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent">
          <i className={`${icon} text-white text-2xl`}></i>
        </div>
        <h3 className="mb-3 text-xl font-semibold font-heading text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export const About = () => {
  const teamMembers = [
    {
      name: "Alián Torres Méndez",
      role: "Desarrollador Frontend",
      description: "Estudiante de tercer año de la UCI, especializado en desarrollo de soluciones médicas digitales.",
      photo: "src/images/alian.jpg" // Ruta a la foto de Alían
    },
    {
      name: "Rudy Daniel Carballo Miranda",
      role: "Desarrollador Frontend",
      description: "Estudiante de tercer año de la UCI, experto en interfaces de usuario y experiencia médica.",
      icon: "fas fa-code"
    }
  ];

  const values = [
    {
      icon: "fas fa-heart",
      title: "Compromiso Médico",
      description: "Dedicados a mejorar la calidad de la educación médica através de la tecnología"
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Educación de Calidad",
      description: "Facilitamos el aprendizaje continuo y la evaluación profesional en medicina"
    },
    {
      icon: "fas fa-users",
      title: "Colaboración",
      description: "Conectamos estudiantes y doctores para un intercambio de conocimiento efectivo"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Confianza y Seguridad",
      description: "Protegemos la información médica con los más altos estándares de seguridad"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 hero-section">
        <div className="container px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl font-heading">
            Acerca de <span className="text-accent">MedHistory</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white/90">
            Somos un equipo de estudiantes de la Universidad de las Ciencias Informáticas (UCI) 
            comprometidos con revolucionar la educación médica a través de la tecnología.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading text-foreground">
                Nuestra <span className="gradient-text">Misión</span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Facilitar la evaluación remota de estudiantes de medicina por parte de doctores 
                especializados, creando un puente tecnológico que mejore la calidad de la 
                educación médica y la formación de futuros profesionales de la salud.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="mt-1 text-xl fas fa-check-circle text-accent"></i>
                  <p className="text-muted-foreground">
                    Conectar estudiantes con doctores especialistas de manera eficiente
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="mt-1 text-xl fas fa-check-circle text-accent"></i>
                  <p className="text-muted-foreground">
                    Proporcionar evaluaciones detalladas y constructivas
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="mt-1 text-xl fas fa-check-circle text-accent"></i>
                  <p className="text-muted-foreground">
                    Mantener altos estándares de seguridad y privacidad médica
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading text-foreground">
                Nuestra <span className="gradient-text">Visión</span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Ser la plataforma líder en evaluación médica remota, transformando la manera 
                en que los estudiantes de medicina reciben retroalimentación profesional y 
                mejorando continuamente la calidad de la educación médica.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="mt-1 text-xl fas fa-star text-accent"></i>
                  <p className="text-muted-foreground">
                    Innovación constante en tecnología médica educativa
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="mt-1 text-xl fas fa-star text-accent"></i>
                  <p className="text-muted-foreground">
                    Accesibilidad global para estudiantes y doctores
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="mt-1 text-xl fas fa-star text-accent"></i>
                  <p className="text-muted-foreground">
                    Contribuir a la formación de mejores profesionales médicos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl font-heading text-foreground">
              Nuestro <span className="gradient-text">Equipo</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Estudiantes de tercer año de la UCI comprometidos con la excelencia 
              en el desarrollo de soluciones médicas digitales.
            </p>
          </div>

          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-8 text-center medical-card">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent">
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="object-cover w-full h-full rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="items-center justify-center hidden w-full h-full text-white text-3xl">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold font-heading text-foreground">
                  {member.name}
                </h3>
                <p className="mb-4 font-semibold text-accent">
                  {member.role}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="max-w-2xl p-6 mx-auto medical-card">
              <h3 className="mb-3 text-xl font-semibold font-heading text-foreground">
                <i className="mr-2 fas fa-university text-primary"></i>
                Universidad de las Ciencias Informáticas (UCI)
              </h3>
              <p className="text-muted-foreground">
                Orgullosos estudiantes de tercer año, aplicando nuestros conocimientos 
                en informática para crear soluciones innovadoras en el sector de la salud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl font-heading text-foreground">
              Nuestros <span className="gradient-text">Valores</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Los principios que guían nuestro trabajo y compromiso con la excelencia médica.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <FeatureCard 
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};