<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;


/**
 * @property int $id
 * @property string $name
 * @property string $country
 * @property float $latitude
 * @property float $longitude
 * @property string $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'country', 'latitude', 'longitude', 'description'])]
class Location extends Model
{
    /**
     * Saņem atribūtus, kas jāaizpilda.
     * @return array<string>
     */
    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }
}