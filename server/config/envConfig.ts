require('dotenv').config();

export interface EnvConfig {

  redis: {
      host: string;
      port: number;
      options: {};
  };
  express: {
      public : {
          port : number;
      };
      admin : {
        port : number;
      };
      session : {
          secret : string;
      }
  }
  frontend : {
      port : number; 
  };
  amadeus: {
    key: string;
    secret: string;
    accessToken: string;
  }
}


export const envConfig: EnvConfig = {

  redis: {
      host: process.env["REDIS_HOST"],
      port: parseInt(process.env["REDIS_PORT"]),
      options: {},
  },
  express: {
      public: {
          port: parseInt(process.env["PUBLIC_PORT"])
      },
      admin: {
        port: parseInt(process.env["ADMIN_PORT"])
      },
      session : {
        secret : process.env["SESH_SECRET"]
      },
  },
  frontend : {
    port : parseInt(process.env["FRONTEND_PORT"])
  },
  amadeus: {
    key: process.env["AMADEUS_KEY"],
    secret : process.env["AMADEUS_SECRET"],
    accessToken: process.env["AMADEUS_ACCESS_TOKEN"]
  }
};
