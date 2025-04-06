/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    !fields || !fields.length
      ? this.fields = ['*']
      : this.fields = [ ...fields ];

    return this;
  }

  where(condition: string): QueryBuilder {
    if (condition.trim() !== '')
      !this.conditions.length 
        ? this.conditions.push(`WHERE ${condition}`)
        : this.conditions.push(`AND WHERE ${condition}`);

      return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    if (this.orderFields.length) {
      this.orderFields.splice(this.orderFields.length -1, 0, field)
      
      if (this.orderFields[this.orderFields.length - 1] !== direction) {
        this.orderFields.pop();
        this.orderFields.push(direction);
      }
    } else {
      this.orderFields.push(field);
      this.orderFields.push(direction);
    }

    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count
    return this;
  }

  execute(): string {
    // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
    const selectFields = this.fields.length ? this.fields.join(', ') : this.fields;
    const whereConditions = this.conditions.join('\n ')
    const orderConditions = this.orderFields.join(' ')
    
    return `SELECT ${selectFields}
      FROM ${this.table}
      ${whereConditions}
      ORDER BY ${orderConditions}
      LIMIT ${this.limitCount}
    `;
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy('name', 'ASC')
    .limit(10)
    .execute();

  console.log('%cConsulta:\n', COLORS.red);
  console.log(usersQuery);
}

main();
