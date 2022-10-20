<?php

namespace Tests\Unit;

use Tests\TestCase;

class AuthApiTest extends TestCase
{
    /*Metodo para testear la funcion de iniciar sesion */
    public function test_login()
    {
        $response = $this->postJson(
            '/api/login',
            ['user'=>'invturismo859','clave'=>'Turismo2022*']
        );
        $response->assertOk()
        ->assertJson(['state'=>true]);
    }
}
