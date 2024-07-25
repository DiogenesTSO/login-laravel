
    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('load-user').addEventListener('click', function(e) {
            e.preventDefault();

            fetch('/lista-usuarios')
                .then(Response => Response.json())
                .then(data => {
                    let userList = '<table class="table">';
                    userList += '<thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Data de Criação</th></tr></thead><tbody>';
                    data.forEach(user => {
                        userList += `<tr>
                                        <td>${user.id}</td>
                                        <td>${user.name}</td>
                                        <td>${user.email}</td>
                                        <td>${new Date(user.created_at).toLocaleDateString()}</td>
                                    </tr>`;
                    });
                    userList += '</tbody></table>';
                    document.getElementById('lista-usuarios').innerHTML = userList;
                })

                .catch(error => console.error('error: ', error));
            });
        });