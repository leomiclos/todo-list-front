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
    private snackBar: MatSnackBar
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
      user: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });

    this.formRegister = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      confirmSenha: ['', [Validators.required]]
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
    if (this.formRegister.invalid) return;

    const usuario = this.formRegister.getRawValue();
    this.usuarioService.registrar(usuario).subscribe((response) => {
      if (response.sucesso) {
        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          text: 'Você pode agora fazer o login.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      } else {
        this.snackBar.open(
          'Falha no cadastro',
          'Por favor, tente novamente.',
          {
            duration: 3000,
          }
        );
      }
    });
  }

  logar() {
    if (this.formLogin.invalid) return;


    var usuario = this.formLogin.getRawValue()


    this.usuarioService.login(usuario).subscribe((response) => {
      if (!response.sucesso) {
        this.snackBar.open(
          'Falha na autenticação',
          'Usuário ou senha incorretos.',
          {
            duration: 3000,
          }
        );
      }
    });
  }
}
