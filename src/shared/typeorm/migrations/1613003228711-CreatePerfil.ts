import { MigrationInterface, QueryRunner, Table } from 'typeorm'; //eslint-disable-line

export class CreatePerfil1613003228711 implements MigrationInterface {
  private table = new Table({
    name: 'perfils',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'cpf',
        type: 'varchar',
        isUnique: true
      },
      {
        name: 'birthdate',
        type: 'timestamp'
      },
      {
        name: 'phone',
        type: 'varchar'
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }
    ]
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('perfils');
  }
}
