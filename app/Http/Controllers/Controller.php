<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sendResponse($result, $message)
    {
        return Response::json(self::makeResponse($message, $result));
    }

    private static function makeResponse($message, $data)
    {
        return [
            'data' => $data,
            'meta' => [
                'success' => true,
                'message' => $message,
            ]
        ];
    }

    public function sendError($error, $code = 400)
    {
        return Response::json(self::makeError($error), $code);
    }

    private static function makeError($message, array $data = [])
    {
        $res = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }

    public function sendSuccess($message, $code = 200)
    {
        return Response::json([
            'success' => true,
            'message' => $message
        ], $code);
    }
}
