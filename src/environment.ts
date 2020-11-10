enum Environments {
  local_environment = 'local',
  dev_environment = 'dev',
  prod_environment = 'prod',
  qa_environment = 'qa',
}

class Environment {
  private environment: string;

  constructor(environment: string) {
    this.environment = environment ?? Environments.local_environment;
  }

  getPort(): number {
    if (this.environment === Environments.prod_environment) {
      return 8081;
    } else if (this.environment === Environments.dev_environment) {
      return 8082;
    } else if (this.environment === Environments.qa_environment) {
      return 8083;
    } else {
      return 3000;
    }
  }

  getDBName(): string {
    if (this.environment === Environments.prod_environment) {
      return 'db_prod';
    } else if (this.environment === Environments.dev_environment) {
      return 'db_dev';
    } else if (this.environment === Environments.qa_environment) {
      return 'db_qa';
    } else {
      return 'db_local';
    }
  }

  getCredentialInfo(): string {
    if (this.environment === Environments.prod_environment) {
      return 'dbuser:dbpass';
    } else if (this.environment === Environments.dev_environment) {
      return 'dbuser:dbpass';
    } else if (this.environment === Environments.qa_environment) {
      return 'dbuser:dbpass';
    } else {
      return 'dbuser:dbpass';
    }
  }
}

export default new Environment(process.env.evn_name);