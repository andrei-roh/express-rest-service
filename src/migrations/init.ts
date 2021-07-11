import { QueryRunner } from 'typeorm';

class InitMigration1624190802281 {
  static async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "name" VARCHAR(100) NOT NULL,
      "login" VARCHAR(100) NOT NULL,
      "password" VARCHAR(100) NOT NULL,
      CONSTRAINT "PK_user" PRIMARY KEY ("id")
    )`);
    await queryRunner.query(`CREATE TABLE "column" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "title" VARCHAR(255) NOT NULL,
      "order" INTEGER NOT NULL,
      "boardId" UUID NOT NULL,
      CONSTRAINT "PK_column" PRIMARY KEY ("id")
    )`);
    await queryRunner.query(`CREATE TABLE "board" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "title" VARCHAR(255) NOT NULL,
      CONSTRAINT "PK_board" PRIMARY KEY ("id")
    )`);
    await queryRunner.query(`CREATE TABLE "task" (
      "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
      "title" VARCHAR(255) NOT NULL,
      "order" INTEGER NOT NULL,
      "description" VARCHAR(255) NOT NULL,
      "boardId" UUID NOT NULL,
      "columnId" UUID,
      "userId" UUID,
      CONSTRAINT "PK_task" PRIMARY KEY ("id")
    )`);
  }

  static async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "task"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "board"');
    await queryRunner.query('DROP TABLE "column"');
  }
}

export { InitMigration1624190802281 as InitMigration };
