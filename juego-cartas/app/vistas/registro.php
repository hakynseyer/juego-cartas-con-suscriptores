<div class="container-fluid vista-juego" id="registro">
    <form id="form-registro">
        <div class="form-group">
            <label for="nombre">Nombre de usuario</label>
            <input id="nombre" name="nombre" type="text" value="nombre" placeholder="Nombre de usuario">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" value="a@a.com" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="password">Contraseña</label>
            <input id="password" name="password" type="password" value="123456" placeholder="Contraseña">
        </div>
        <div class="form-group">
            <button type="button" id="enviar-registro" name="enviar" button="submit" onclick="losFormularios.registro()">Registrarse</button>
        </div>
    </form>
</div>
<div class="container-fluid vista-juego" id="registro-correcto">
</div>