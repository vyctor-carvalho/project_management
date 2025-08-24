import { Column } from "typeorm";

export class AuthLogin {

    @Column({ unique: true })    
    email: string;

    @Column({ length: 100 })
    password: string;

}
