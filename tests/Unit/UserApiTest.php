<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Tests\Helpers\HelpToken;
use Illuminate\Support\Facades\Hash;

class UserApiTest extends TestCase
{
    /*Metodo que retorna los datos necesarios para crear o actualizar algun usuario */
    private function sendData()
    {
        $clave = 'Prueba123*';
        return User::factory()->make([
            'CLAVE' => $clave,
            'CONFIRMAR_CLAVE' => $clave
        ])->toArray();
    }

    /*Metodo que testea la creacion de algun usuario */
    public function test_crear_usuario()
    {
        $dataSend = $this->sendData();
        print_r($dataSend);
        $response = $this->withHeaders(HelpToken::headers())
        ->post('/api/register',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }

    /*Metodo que testea la actualizacion de algun usuario */
    public function test_actualizar_usuario()
    {
        $clave = Hash::make('Prueba123*');
        $idUser = User::factory()->create(['CLAVE' => $clave])->toArray()['ID_USUARIO'];
        $dataSend = $this->sendData();
        print_r($dataSend);
        $dataSend = array_merge($dataSend,['ID_USUARIO'=>$idUser]);
        $response = $this->withHeaders(HelpToken::headers())
        ->put('/api/user-update',$dataSend);
        $response->assertOk()
        ->assertJson(['state'=>true]); 
    }
}
