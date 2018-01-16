<div class="container-fluid vista-juego" id="registro">
<div class="row">
    <div class="col-md-12">
        <div class="jumbotron jumbotron-fluid">
        <div class="container text-center">
            <h1 class="display-4">Juego de cartas JD1</h1>
            <p class="lead">"Me he registrado y pasa esto..."</p>
            <br>
        </div>
        </div>
    </div>
</div>
<div class="row" id="formRegistro">
    <div class="col-md-4">
    </div>
    <br>
    <div class="col-md-4" id="area-registro">
        <h2>Rellena tus datos</h2>
        <form id="form-registro">
            <div class="form-group">
                <label for="nombre">Nombre de usuario</label>
                <input class="form-control" id="nombre" name="nombre" type="text" placeholder="Nombre de usuario">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" id="email" name="email" type="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input class="form-control" id="password" name="password" type="password" placeholder="Contraseña">
            </div>
            <br>
            <div class="form-group">
                <button class="form-control" type="button" id="enviar-registro" name="enviar" button="submit" onclick="losFormularios.registro()">Registrarse</button>
            </div>
        </form>
    </div>
    <div class="col-md-4">
    </div>
</div>

</div>
<div class="container-fluid vista-juego text-center registroCorrecto" id="registro-correcto">
    <br>
    <br>
    <div class="row">
        <div class="col-md-4">
        </div>
        <br>
        <div class="col-md-4" id="area-registro-correcto">
            <h2>Te has registrado con éxito</h2>
            <br>
            <p>Ya puedes comenzar a disfrutar del juego más popular en Twitch</p>
            <br>
            <button class="form-control" onclick="losEventos.login()" id="login-registro-correcto">Iniciar sesión</button>
        </div>
        <div class="col-md-4">
        </div>
    </div>
</div>
