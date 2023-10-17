import Title from "../components/Title/Title";

const language = {
  en: {
    home: {
      content: {
        name: (
          <h1>
            Hi, I'm <span className="name">Konrad</span>, a
          </h1>
        ),
        titles: [
          "Full Stack Developer",
          "Web Developer",
          "Web Designer",
          "React Developer",
        ],
        button: "Contact me",
      },
    },
    aboutme: {
      title: <Title title={"About me"} />,
      content: (
        <span>
          <span>
            Hello there, I'm <span className="color">Konrad</span>,
          </span>
          <img
            src="https://media.giphy.com/media/RhGbWYqUJdPWM18zI6/giphy.gif"
            width="50px"
            height="50px"
          ></img>
          <br />
          <span>
            <br />a{" "}
            <span className="color">versatile Full Stack Developer</span> with a
            primary focus on creating{" "}
            <span className="color">impactful applications</span> using{" "}
            <span className="color">React </span>
            and <span className="color">TypeScript</span>.
            <br />
            <span>
              <br /> My{" "}
              <span className="color">dedication to ongoing learning</span>{" "}
              keeps me at <span className="color">tech's forefront</span>,
              delivering <span className="color">dynamic solutions</span>.
              <br />
              Passionate about{" "}
              <span className="color">Full Stack Development</span>, I strive
              for seamless integration and outstanding outcomes in every
              project.
            </span>
          </span>
        </span>
      ),
    },
    experiences: {
      title: <Title title={"Experiences"} />,

      content: {
        haba: (
          <>
            <div className="header">
              IT Internship
              <span style={{ color: "#62efff", marginLeft: "5px" }}>
                <a
                  className="link"
                  href="https://habafamilygroup.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @Haba
                </a>
              </span>
            </div>
            <div className="date">
              <div>Oct 2013</div>
            </div>
            <ul className="ul">
              <li className="li">
                <b>Type:</b> Internship
              </li>
              <li className="li">
                Learned basic programming principles and algorithms with Java
              </li>
              <li className="li">
                Gained first insights into the everyday professional life of a
                software developer
              </li>
            </ul>
          </>
        ),
        kapp: (
          <>
            <div className="header">
              IT Internship
              <span style={{ color: "#62efff", marginLeft: "5px" }}>
                <a
                  className="link"
                  href="https://www.kapp-niles.com/de/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @KAPP NILES
                </a>
              </span>
            </div>
            <div className="date">
              <div>Apr 2020 - Jun 2020</div>
            </div>
            <ul className="ul">
              <li className="li">
                <b>Type:</b> Internship
              </li>
              <li className="li">
                My scope was to program a web frontend for a commissioning
                overview.
              </li>
              <li className="li">Tools I used:</li>
              <ul className="ul2">
                <li className="li">HTML</li>
                <li className="li">CSS</li>
                <li className="li">JavaScript</li>
                <li className="li">MongoDB</li>
              </ul>
            </ul>
          </>
        ),
        huk: (
          <>
            {" "}
            <div className="header">
              Apprenticeship as IT specialist
              <span style={{ color: "#62efff", marginLeft: "5px" }}>
                <a
                  className="link"
                  href="https://www.huk.de"
                  target="_blank"
                  rel="noreferrer"
                >
                  @HUK-COBURG
                </a>
              </span>
            </div>
            <div className="date">
              <div>Sep 2022 - Now</div>
            </div>
            <ul className="ul">
              <li className="li">
                <b>Type:</b> Apprenticeship
              </li>
              <li className="li">Assignments in various departments.</li>
              <li className="li">Tools I used:</li>
              <ul className="ul2">
                <li className="li">HTML</li>
                <li className="li">CSS</li>
                <li className="li">JavaScript</li>
                <li className="li">Microsoft SQL Server</li>
                <li className="li">Java</li>
                <li className="li">IBM Mainframe</li>
                <li className="li">PL/I</li>
                <li className="li">REXX</li>
              </ul>
            </ul>
          </>
        ),
      },
    },
    projects: {
      title: <Title title={"Projects"} />,
      content: {
        serienRanking: {
          name: "Serien Ranking",
          description:
            "A website to rank your favorite series. Built with React, JavaScript, and Firebase.",
        },
        portfolio: {
          name: "Portfolio Website",
          description: "My personal portfolio website.",
        },
      },
    },
    contact: {
      title: <Title title={"Contact"} />,
      content: {
        mail: {
          label: "mail",
          error: "Please enter a valid mail address",
        },
        subject: {
          label: "subject",
          error: "Please enter a subject",
        },
        message: {
          label: "message",
          error: "Please enter a message",
        },
        button: "Send",
        alert: "Thank you for your message!",
      },
    },
  },
  de: {
    home: {
      content: {
        name: (
          <h1>
            Hi, ich bin <span className="name">Konrad</span>, ein
          </h1>
        ),
        titles: [
          "Full Stack Entwickler",
          "Web Entwickler",
          "Web Designer",
          "React Entwickler",
        ],
        button: "Kontaktiere mich",
      },
    },
    aboutme: {
      title: <Title title={"Über mich"} />,
      content: (
        <span>
          <span>
            Hallo, ich bin <span className="color">Konrad</span>,
          </span>
          <img
            src="https://media.giphy.com/media/RhGbWYqUJdPWM18zI6/giphy.gif"
            width="50px"
            height="50px"
          ></img>
          <br />
          <span>
            <br />
            ein{" "}
            <span className="color">
              vielseitiger Full-Stack-Entwickler
            </span>{" "}
            dessen Hauptaugenmerk auf der Erstellung{" "}
            <span className="color">irkungsvoller Anwendungen</span> mit{" "}
            <span className="color">React </span>
            und <span className="color">TypeScript</span>.
            <br />
            <span>
              <br /> Durch mein{" "}
              <span className="color">Engagement für ständiges Lernen</span>{" "}
              bleibe ich an{" "}
              <span className="color">der Spitze der Technik</span>, dund
              liefere <span className="color">dynamische Lösungen</span>.
              <br />
              Als leidenschaftlicher{" "}
              <span className="color">Full-Stack-Entwickler</span> strebe ich
              bei jedem Projekt nach nahtloser Integration und herausragenden
              Ergebnissen.
            </span>
          </span>
        </span>
      ),
    },
    experiences: {
      title: <Title title={"Erfahrungen"} />,

      content: {
        haba: (
          <>
            <div className="header">
              IT Praktikum
              <span style={{ color: "#62efff", marginLeft: "5px" }}>
                <a
                  className="link"
                  href="https://habafamilygroup.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @Haba
                </a>
              </span>
            </div>
            <div className="date">
              <div>Okt 2013</div>
            </div>
            <ul className="ul">
              <li className="li">
                <b>Typ:</b> Praktikum
              </li>
              <li className="li">
                Erlernen grundlegender Programmierprinzipien und Algorithmen mit
                Java
              </li>
              <li className="li">
                Erste Einblicke in den Berufsalltag eines Softwareentwicklers
              </li>
            </ul>
          </>
        ),
        kapp: (
          <>
            <div className="header">
              IT Praktikum
              <span style={{ color: "#62efff", marginLeft: "5px" }}>
                <a
                  className="link"
                  href="https://www.kapp-niles.com/de/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @KAPP NILES
                </a>
              </span>
            </div>
            <div className="date">
              <div>Apr 2020 - Jun 2020</div>
            </div>
            <ul className="ul">
              <li className="li">
                <b>Typ:</b> Praktikum
              </li>
              <li className="li">
                Meine Aufgabe war die Programmierung eines Web-Frontends für
                eine Kommissionierungsübersicht
              </li>
              <li className="li">Benutze Werkzeuge:</li>
              <ul className="ul2">
                <li className="li">HTML</li>
                <li className="li">CSS</li>
                <li className="li">JavaScript</li>
                <li className="li">MongoDB</li>
              </ul>
            </ul>
          </>
        ),
        huk: (
          <>
            {" "}
            <div className="header">
              Ausbildung als Fachinformatiker
              <span style={{ color: "#62efff", marginLeft: "5px" }}>
                <a
                  className="link"
                  href="https://www.huk.de"
                  target="_blank"
                  rel="noreferrer"
                >
                  @HUK-COBURG
                </a>
              </span>
            </div>
            <div className="date">
              <div>Sep 2022 - Now</div>
            </div>
            <ul className="ul">
              <li className="li">
                <b>Typ:</b> Ausbildung
              </li>
              <li className="li">Einsätze in verschiedenen Abteilungen.</li>
              <li className="li">Benutze Werkzeuge:</li>
              <ul className="ul2">
                <li className="li">HTML</li>
                <li className="li">CSS</li>
                <li className="li">JavaScript</li>
                <li className="li">Microsoft SQL Server</li>
                <li className="li">Java</li>
                <li className="li">IBM Mainframe</li>
                <li className="li">PL/I</li>
                <li className="li">REXX</li>
              </ul>
            </ul>
          </>
        ),
      },
    },
    projects: {
      title: <Title title={"Projekte"} />,
      content: {
        serienRanking: {
          name: "Serien Ranking",
          description:
            "Eine Website zum Ranking meiner Lieblingsserien. Gebaut mit React, JavaScript und Firebase.",
        },
        portfolio: {
          name: "Portfolio Website",
          description: "Meine persönliche Portfolio-Website.",
        },
      },
    },
    contact: {
      title: <Title title={"Kontakt"} />,
      content: {
        mail: {
          label: "Email",
          error: "Bitte geben Sie eine gültige Email ein",
        },
        subject: {
          label: "Betreff",
          error: "Bitte geben Sie einen Betreff ein",
        },
        message: {
          label: "Nachricht",
          error: "Bitte geben Sie eine Nachricht ein",
        },
        button: "Senden",
        alert: "Vielen Dank für Ihre Nachricht!",
      },
    },
  },
};

export default language;
