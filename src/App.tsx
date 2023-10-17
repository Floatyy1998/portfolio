import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import logo from "./logo.svg";
import "./App.css";
import Pages from "./components/Pages/Pages";
import { useCallback, useEffect } from "react";
import Div100vh from "react-div-100vh";
import { useState } from "react";

function App() {
  const [particles, setParticles] = useState(80);

  useEffect(() => {
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    if (window.innerWidth < 950) {
      setParticles(30);
    }
  }, []);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );
  return (
    <Div100vh>
      <>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,

            particles: {
              color: {
                value: ["#074a40", "#027362", "#25897a", "#00fed7", "#00b4a0"],
              },
              links: {
                color: "#00fed7",
                distance: 200,
                enable: false,
                opacity: 1,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 3,
                straight: false,
              },
              number: {
                value: particles,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: 40,
                random: true,
                anim: {
                  enable: true,
                  speed: 10,
                  size_min: 0.1,
                  sync: true,
                },
              },
            },
            detectRetina: true,
          }}
        />
        <div className="App">
          <Pages />
        </div>
      </>
    </Div100vh>
  );
}

export default App;
