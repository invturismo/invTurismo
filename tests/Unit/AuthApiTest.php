<?php

namespace Tests\Unit;

use Tests\TestCase;

class AuthApiTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
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
