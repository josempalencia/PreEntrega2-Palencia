const user = "admin";
const pass = "pass1234";

for (let i = 0 ; i < 3 ; i++){

    let u = prompt ("ingrese su usuario");
    let p = prompt ("ingrese su contraseña");

    if (u == user && p == pass){

        alert("Bienvendio Admin");
        break;
    }
}