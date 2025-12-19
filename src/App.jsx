import Header from './components/Header'
import AboutMe from './pages/AboutMe'
import Career from './pages/Career'
import Projects from './pages/Projects'
import Starfield from './components/Starfield'
import FadeInSection from './components/FadeInSection'

function App() {
    return (
        <div className="min-h-screen relative">
            <Starfield />
            <Header />

            <main className="pt-20">
                {/* About Section */}
                <section id="about">
                    <FadeInSection>
                        <AboutMe />
                    </FadeInSection>
                </section>

                {/* Career Section */}
                <section id="career" className="py-10">
                    <FadeInSection>
                        <Career />
                    </FadeInSection>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-10">
                    <FadeInSection>
                        <Projects />
                    </FadeInSection>
                </section>
            </main>

        </div>
    )
}
export default App
