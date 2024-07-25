
        //Script para chamar a rota lista-usuarios e exibir a lista de usuarios da tabela Users.
    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('load-user').addEventListener('click', function(e) {
            e.preventDefault();

            fetch('/lista-usuarios')
                .then(Response => Response.json())
                .then(data => {
                    let userList = '<table class="table">';
                    userList += '<thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Data de Criação</th><th>Ação</th></tr></thead><tbody>';
                    data.forEach(user => {
                        userList += `<tr>
                                        <td>${user.id}</td>
                                        <td>${user.name}</td>
                                        <td>${user.email}</td>
                                        <td>${new Date(user.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <a href="/edit/${user.id}" class="btn btn-warning btn-sm">Editar</a>
                                            <form action="/users/${user.id}" method="POST" style="display:inline;">
                                                <button type="submit" class="btn btn-danger btn-sm">Excluir</button>
                                            </form>
                                        </td>
                                    </tr>`;
                    });
                    userList += '</tbody></table>';
                    document.getElementById('lista-usuarios').innerHTML = userList;
                })

                .catch(error => console.error('error: ', error));
            });
        });