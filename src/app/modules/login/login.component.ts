import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MatFormFieldModule, MatCardModule, MatCardTitle, ReactiveFormsModule, MatInputModule, MatSlideToggleModule, MatButtonModule],
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {


  formLogin!: FormGroup;
  formRegister!: FormGroup;
  isRegisterMode: boolean = false;
  title: string = 'Login'

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.criarForm();
    this.maleOrFemale()
  }



  maleOrFemale() {
    Swal.fire({
      icon: 'question',
      title: 'Você é homem ou mulher?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Homem',
      denyButtonText: 'Mulher',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Bem-vindo, Recrutador!',
          text: 'Se chegou aqui, provavelmente você teve acesso ao meu currículo. Fico feliz com o interesse. Esse projeto é uma TODO List, feita com Angular 17 e Node.JS. O objetivo é demonstrar minhas habilidades com o Angular e criação de API com Node. Fique à vontade para criar uma conta e testar a aplicação.',
          icon: 'info',
          confirmButtonText: 'Ok',
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Bem-vinda, Recrutadora!',
          text: 'Se chegou aqui, provavelmente você teve acesso ao meu currículo. Fico feliz com o interesse. Esse projeto é uma TODO List, feita com Angular 17 e Node.JS. O objetivo é demonstrar minhas habilidades com o Angular e criação de API com Node. Fique à vontade para criar uma conta e testar a aplicação.',
          icon: 'info',
          confirmButtonText: 'Ok',
        });
      }
    });
  }



  criarForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.formRegister = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.senhasDevemConcordar });
  }

  senhasDevemConcordar(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmSenha = group.get('confirmSenha')?.value;
    return senha === confirmSenha ? null : { senhasDiferentes: true };
  }


  toggleForm(event: any) {
    this.isRegisterMode = event.checked;
    this.title = this.isRegisterMode ? 'Registrar' : 'Login';
  }


  registrar() {
    // if (this.formRegister.invalid) return;

    const usuario = this.formRegister.getRawValue();
    console.log(usuario);

    this.usuarioService.registrar(usuario).subscribe((response) => {
        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          text: 'Você pode agora fazer o login.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.isRegisterMode = false;

    },
    (error) => {
      Swal.fire({
        title: 'Erro ao realizar cadastro.',
        text: 'Verifique se os campos estão preenchidos corretamente.',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
  );
  }

  logar() {
    const usuario = this.formLogin.getRawValue()

    this.usuarioService.login(usuario).subscribe((response) => {
      console.log(response);
      if(response){
        Swal.fire({
          title: 'Login realizado com sucesso!',
          text: 'Você pode agora acessar o sistema.',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        this.router.navigate(['pages/list'])
      }

    });
  }
}
