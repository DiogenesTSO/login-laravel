<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class principalController extends Controller
{
    public function getUsers() {
        $users = User::all();
        return response()->json($users);
    }

    public function edit($id) {
        $user = User::findOrFail($id);
        return view('edit', compact('user'));
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
    ]);

    $user = User::findOrFail($id);
    $user->name = $request->name;
    $user->email = $request->email;
    $user->save();

    return redirect()->route('edit', $user->id)->with('success', 'Usuário atualizado com sucesso!');
}

}
