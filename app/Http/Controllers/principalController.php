<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class principalController extends Controller
{
    public function getUsers() {
        $users = User::all();
        return response()->json($users);
    }

    public function edit($id) {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
{

    Log::info('Update request received', $request->all()); // Adicione isto para depuração
  /*  $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
    ]); */

    $user = User::findOrFail($id);
    $user->name = $request->name;
    $user->email = $request->email;
    $user->save();

    return response()->json(['success' => true]);
}

}
