import {MigrationInterface, QueryRunner} from "typeorm";

export class final1621854474685 implements MigrationInterface {
    name = 'final1621854474685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "playerId" uuid, "choiceId" uuid, "gameStateId" uuid, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phase" character varying NOT NULL, CONSTRAINT "PK_e7b8f9fb87d56841a7aaa284f52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "playerId" uuid, "aimId" uuid, "gameStateId" uuid, CONSTRAINT "PK_270d8a54e9ae132b9368e0d93a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_alive" boolean NOT NULL DEFAULT true, "is_exposed" boolean NOT NULL DEFAULT false, "fouls" integer NOT NULL DEFAULT '0', "role" character varying NOT NULL DEFAULT '', "gameId" uuid, "userId" uuid, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "lobbyId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lobby" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creator_id" uuid, "name" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_0d9e681a820740df03d4ba784bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "janusSession" character varying NOT NULL DEFAULT '', "videoRoom" character varying NOT NULL DEFAULT '', "day" integer NOT NULL DEFAULT '0', "winner" character varying NOT NULL DEFAULT '', "stateId" uuid, CONSTRAINT "REL_ee4ee4788bef0d086d8d6347e5" UNIQUE ("stateId"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_98ba57e435f05967d1f13e0fa1e" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_6f6715f8a59f4ff4e0951ecb086" FOREIGN KEY ("choiceId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_6e7a465c1fe2b9f5939912810cd" FOREIGN KEY ("gameStateId") REFERENCES "game_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shot" ADD CONSTRAINT "FK_6390573e6f0dcff12b44a2f12d9" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shot" ADD CONSTRAINT "FK_c05d4f2099f8e48df5ee281179e" FOREIGN KEY ("aimId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shot" ADD CONSTRAINT "FK_08181bf12ec061e49269f7885cf" FOREIGN KEY ("gameStateId") REFERENCES "game_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_40f07039bf52f532a942c05945e" FOREIGN KEY ("lobbyId") REFERENCES "lobby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f" FOREIGN KEY ("stateId") REFERENCES "game_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_40f07039bf52f532a942c05945e"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a"`);
        await queryRunner.query(`ALTER TABLE "shot" DROP CONSTRAINT "FK_08181bf12ec061e49269f7885cf"`);
        await queryRunner.query(`ALTER TABLE "shot" DROP CONSTRAINT "FK_c05d4f2099f8e48df5ee281179e"`);
        await queryRunner.query(`ALTER TABLE "shot" DROP CONSTRAINT "FK_6390573e6f0dcff12b44a2f12d9"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_6e7a465c1fe2b9f5939912810cd"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_6f6715f8a59f4ff4e0951ecb086"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_98ba57e435f05967d1f13e0fa1e"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "lobby"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "shot"`);
        await queryRunner.query(`DROP TABLE "game_state"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
