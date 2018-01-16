<?php
$email = isset($_POST['inputEmail']) ? $_POST['inputEmail'] : null;
$password = isset($_POST['inputPassword']) ? $_POST['inputPassword'] : null;
$conexion = null;

if (!isset($conexion)) {
	try {
		include_once '../config.php';
	   
		$conexion = new PDO('mysql:host='.NOMBRE_SERVIDOR.'; dbname='.NOMBRE_BD, NOMBRE_USUARIO, PASSWORD);
		$conexion -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conexion -> exec("SET CHARACTER SET utf8");
		
		$sql = 'SELECT nombre, password FROM usuarios WHERE email=:email AND activo = 1';
		
		$sentencia = $conexion -> prepare($sql);
                
        $sentencia -> bindParam(':email', $email, PDO::PARAM_STR);
        
        $sentencia -> execute();

        $resultado = $sentencia -> fetch();
        
        if (!empty($resultado)) {
            if (password_verify($password, $resultado['password'])) $validacion = ['respuesta' => true, 'usuario' => $resultado['nombre']];
            else $validacion = ['respuesta' => false, 'mensaje' => 'Hay errores en alguno de los campos'];
        } else $validacion = ['respuesta' => false, 'mensaje' => 'No se encontró el usuario'];
        
        echo json_encode($validacion);
				
	} catch (PDOException $ex) {
        echo json_encode(['respuesta'=> $ex -> getMessage()]);
		die();
	}
}
