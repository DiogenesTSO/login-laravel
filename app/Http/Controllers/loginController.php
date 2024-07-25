<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class loginController extends Controller
{
        //abre o formulário de login
    public function showLogin() {
        return view('login');
    }
        //Abre o formulário de registro
    public function showRegistro() {
        return view('registro');
    }

        //Abre o a página principal
    public function principal(){
        return view('principal');
    }

        //Cadastrar novos usuários na tabela users
    public function register(Request $request) {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), 
        ]);

        return redirect()->back()->with('success', 'Usuário registrado com sucesso!');
    } 

        //Valida o email e a senha e direciona para a pagina principal.
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
            return redirect()->intended('/principal');
    }

        return back()->with('error', 'Usuário ou senha inválidos!');

}


}
