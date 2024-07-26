
        //Script para chamar a rota lista-usuarios e exibir a lista de usuarios da tabela Users.
    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('load-user').addEventListener('click', function(e) {
            e.preventDefault();

            fetch('/lista-usuarios')
                .then(response => {
                    if(!response.ok){
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
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
                                            <button class="btn btn-warning btn-sm edit-btn" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Editar</button>
                                            <form action="/users/${user.id}" method="POST" style="display:inline;">
                                                <button type="submit" class="btn btn-danger btn-sm">Excluir</button>
                                            </form>
                                        </td>
                                    </tr>`;
                    });
                    userList += '</tbody></table>';
                    document.getElementById('lista-usuarios').innerHTML = userList;

                    document.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', function() {
                            const userId = this.getAttribute('data-id');
                            const userName = this.getAttribute('data-name');
                            const userEmail = this.getAttribute('data-email');

                            document.getElementById('editUserId').value = userId;
                            document.getElementById('editUserName').value = userName;
                            document.getElementById('editUserEmail').value = userEmail;

                            const editUserModal = new bootstrap.Modal(document.getElementById('editUser'));
                            editUserModal.show();
                        });
                    });

                })

                .catch(error => console.error('Fetch error: ', error));
            });

            document.getElementById('editUserForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const userId = document.getElementById('editUserId').value;
                const formData = new FormData(this);

                console.log('User ID:', userId);
        console.log('Form Data:', Object.fromEntries(formData.entries()));

                fetch(`/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: formData
                })
                .then(response => {
                    if(!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if(data.success){
                        location.reload();
                    } else {
                        alert('Erro ao atualziar o usuário');
                    }
                })
                .catch(error => console.error('Submit error:', error));
            });
        });