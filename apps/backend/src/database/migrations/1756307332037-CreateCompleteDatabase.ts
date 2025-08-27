import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompleteDatabase1756307332037 implements MigrationInterface {
    name = 'CreateCompleteDatabase1756307332037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expertise_areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_eb8b1ed5006716c63b3c842f2a0" UNIQUE ("name"), CONSTRAINT "PK_5c8a49ca854a5b22e17e7969420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_expertise_areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "expertise_area_id" uuid, CONSTRAINT "PK_d116dfd223a5e5f56bbade90f48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_employment_type_enum" AS ENUM('CLT', 'PJ', 'Estagiário')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "birth_date" TIMESTAMP NOT NULL, "employment_type" "public"."users_employment_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "current_hashed_refresh_token" character varying, "role_id" uuid, "email" character varying NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying(25) NOT NULL, "project_id" uuid, "member_id" uuid, CONSTRAINT "PK_0b2f46f804be4aea9234c78bcc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "technologies" character varying(150) NOT NULL, "deadline" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('Pendente', 'Fazendo', 'Feito', 'Arquivada')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('Baixa', 'Média', 'Alta', 'Urgente')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" character varying(255), "status" "public"."task_status_enum" NOT NULL DEFAULT 'Pendente', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'Média', "due_date" TIMESTAMP, "project_id" uuid, "user_id" uuid, "expertise_area_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_expertise_areas" ADD CONSTRAINT "FK_e95c194afbe6c82f052a9430e5d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_expertise_areas" ADD CONSTRAINT "FK_4b9cb06be9854358ab009037ac9" FOREIGN KEY ("expertise_area_id") REFERENCES "expertise_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_b5729113570c20c7e214cf3f58d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_0fe49d1dbe3867d97de555f675b" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_02bcc7b8ab8a6a3e6bd131ed21f" FOREIGN KEY ("expertise_area_id") REFERENCES "expertise_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_02bcc7b8ab8a6a3e6bd131ed21f"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_0fe49d1dbe3867d97de555f675b"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_b5729113570c20c7e214cf3f58d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "user_expertise_areas" DROP CONSTRAINT "FK_4b9cb06be9854358ab009037ac9"`);
        await queryRunner.query(`ALTER TABLE "user_expertise_areas" DROP CONSTRAINT "FK_e95c194afbe6c82f052a9430e5d"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "project_members"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_employment_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_expertise_areas"`);
        await queryRunner.query(`DROP TABLE "expertise_areas"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
