// import { QueryRunner } from 'typeorm';
//
// class InitMigration1624190802281 {
//   static async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`CREATE TABLE "user" (
//       "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
//       "name" VARCHAR(100) NOT NULL,
//       "login" VARCHAR(100) NOT NULL,
//       "password" VARCHAR(100) NOT NULL,
//       CONSTRAINT "PK_user" PRIMARY KEY ("id")
//     )`);
//     await queryRunner.query(`CREATE TABLE "column" (
//       "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
//       "title" VARCHAR(255) NOT NULL,
//       "order" INTEGER NOT NULL,
//       "boardId" UUID NOT NULL,
//       CONSTRAINT "PK_column" PRIMARY KEY ("id")
//     )`);
//     await queryRunner.query(`CREATE TABLE "board" (
//       "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
//       "title" VARCHAR(255) NOT NULL,
//       CONSTRAINT "PK_board" PRIMARY KEY ("id")
//     )`);
//     await queryRunner.query(`CREATE TABLE "task" (
//       "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
//       "title" VARCHAR(255) NOT NULL,
//       "order" INTEGER NOT NULL,
//       "description" VARCHAR(255) NOT NULL,
//       "boardId" UUID NOT NULL,
//       "columnId" UUID,
//       "userId" UUID,
//       CONSTRAINT "PK_task" PRIMARY KEY ("id")
//     )`);
//   }
//
//   static async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query('DROP TABLE "task"');
//     await queryRunner.query('DROP TABLE "user"');
//     await queryRunner.query('DROP TABLE "board"');
//     await queryRunner.query('DROP TABLE "column"');
//   }
// }
//
// export { InitMigration1624190802281 as InitMigration };

import { getCreateUser } from '../resources/users/user.utils';
import { User } from '../resources/users/user.model';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitMigration1624190802281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'userIdId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'boardIdId',
            type: 'uuid',
          },
          {
            name: 'columnId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'column_class',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'boardId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'board',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['userIdId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'column_class',
      new TableForeignKey({
        columnNames: ['boardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'board',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['boardIdId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'board',
        onDelete: 'CASCADE',
      })
    );

    const admin = await getCreateUser({ name: 'Andrei', login: 'admin', password: 'admin' });
    await queryRunner.manager.save(User, admin);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const taskTable = (await queryRunner.getTable('task'))!;
    const foreignKey = taskTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('boardIdId') !== -1
    );
    await queryRunner.dropForeignKey('task', foreignKey!);
    const foreignKeyUser = taskTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userIdId') !== -1
    );
    await queryRunner.dropForeignKey('task', foreignKeyUser!);

    const columnTable = (await queryRunner.getTable('column_class'))!;
    const foreignKeycolumn = columnTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('boardId') !== -1
    );
    await queryRunner.dropForeignKey('column_class', foreignKeycolumn!);

    await queryRunner.dropTable('task');
    await queryRunner.dropTable('column_class');
    await queryRunner.dropTable('board');
    await queryRunner.dropTable('user');
  }
}

export { InitMigration1624190802281 as InitMigration };
