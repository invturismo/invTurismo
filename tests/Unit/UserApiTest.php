<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Tests\Helpers\HelpToken;
use Illuminate\Support\Facades\Hash;

class UserApiTest extends TestCase
{
    private function sendData()
    {
        $clave = 'Prueba123*';
        return User::factory()->make([
            'CLAVE' => $clave,
            'CONFIRMAR_CLAVE' => $clave
        ])->toArray();
    }

    public function test_crear_usuario()
    {
        $dataSend = $this->sendData();
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/register',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }

    public function test_actualizar_usuario()
    {
        $clave = Hash::make('Prueba123*');
        $idUser = User::factory()->create(['CLAVE' => $clave])->toArray()['ID_USUARIO'];
        $dataSend = $this->sendData();
        $dataSend = array_merge($dataSend,['ID_USUARIO'=>$idUser]);
        $response = $this->withHeaders(HelpToken::headers())
        ->put('/api/user-update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
