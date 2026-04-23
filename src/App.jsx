import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ProfessionalMatch from './components/ProfessionalMatch'
import Services from './components/Services'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProfessionalMatch />
        <Services />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
