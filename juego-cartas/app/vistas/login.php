<div class="container-fluid vista-juego" id="login">
    <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4 text-center">
            <br>
            <h1>Login</h1>
            <br>
            <form class="form-signin" id="formLogin" autocomplete="off">
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" name="inputEmail" class="form-control" placeholder="Pon tu tomato" required autofocus>
                <br>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="La llave de tu tomato" required>
                <br>
                <div class="error-formulario" id="errorFormulario">
                    <span id="spanFormularioError"></span>
                </div>
                <br>
                <br>
                <div class="checkbox" id="login-checkbox">
                    <label>
                        <input type="checkbox" value="remember-me" > Recuérdame, tomato
                    </label>
                </div>
                <br>
                <button class="btn btn-lg btn-primary btn-block" onclick="losFormularios.login()" type="button" id="aceptar-login">Enter tomato!</button>
                <br>
                <br>
                <a href="#" onclick="losEventos.registro()" id="login-no-tienes-cuenta">¿No tienes una cuenta?</a>
                <br>
                <br>
            </form>
        </div>
        <div class="col-md-4">
        </div>
    </div>
</div>