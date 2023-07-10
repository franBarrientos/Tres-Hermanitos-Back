import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Customer } from "./customer.entity";
import { CustomerDto } from "./customer.dto";

export class CustomerService extends BaseService<Customer> {
  constructor() {
    super(Customer);
  }

  public async findAllCustomers(
    skip: number,
    limit: number
  ): Promise<Customer[]> {
    return (await this.repository).find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          city: true,
        },
      },
      skip,
      take: limit,
    });
  }

  public async findCustomerById(id: number): Promise<Customer | null> {
    return (await this.repository).findOne({
      where: { id },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          city: true,
        },
      },
    });
  }

  public async createCustomer(body: CustomerDto): Promise<Customer> {
    return (await this.repository).save(body);
  }

  public async deleteCustomer(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateCustomer(
    id: number,
    infoUpdate: CustomerDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}
