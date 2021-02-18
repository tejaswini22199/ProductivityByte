const instance = () => {
    return new window.TypingDNA(
      process.env.apikey,
      process.env.apisecret
    );
  };
  
  export default instance;