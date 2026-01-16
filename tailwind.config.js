export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        bgFah:"var(--fond)",
        navbar:"var(--text_navbar)",
        border:"var(--border)",
        shadow:"var(--shadow)",
        shadowBox:"var(--shadowBox)",
        borderTab:"var(--tableBorder)",
        bgInput:"var(--bgInput)",
        Th:"var(--textH1)",
        para:"var(--paragraphe)",
        Mybg:"var(--Mybg)",
        text:"var(--text)",
        modal:"var(--modal)",
        sidebar:"var(--sidebar)",
        topbar:"var(--topbar)",
        borderuser:"var(--borderuser)",
        textsidebar:"var(--textsidebar)",
      }
    },
  },
  plugins: [require("daisyui")],
}

