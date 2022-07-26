module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "var(--zi_chatBackgroundColor)",
        secondary_text: "var(--zi_chatTextColor)",
        primary: "var(--zi_headerBackgroundColor)",
        primary_text: "var(--zi_headerTextColor)",
        bubblegray: { dark: "#3d4e63cc", light: "#edf0f7" },
      },
      zIndex: {
        1: "1",
        4: "4",
        2: "2",
      },
      borderRadius: {
        xl: "1rem",
      },
      dropShadow: {
        sl: "0px 5px 15px 0px rgba(0, 0, 0, 10%)",
      },
      minHeight: {
        "100px": "100px",
      },
      maxWidth: {
        "240px": "240px",
        "215px": "215px",
      },
    },
  },
  plugins: [],
};
