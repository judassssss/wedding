<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Session;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests;
use Carbon\Carbon;

session_start();

class HomeController extends Controller
{
    public function index(){
        return view('home');
    }

    public function save_guest_confirmations(Request $request){
        $data = array();
        $data['your_name'] = $request->your_name;
        $data['attendance_status'] = $request->attendance_status;
        $data['relationship_to_couple'] = $request->relationship_to_couple;
        $data['party_size'] = $request->party_size;
        if ($request->message_to_couple == "") {
            $data['message_to_couple'] = "Trống";
        } else {
            $data['message_to_couple'] = $request->message_to_couple;
        }

        // Set timestamps to UTC+7
        $currentTimestamp = Carbon::now('Asia/Ho_Chi_Minh')->format('Y-m-d H:i:s');
        $data['created_at'] = $currentTimestamp;
        $data['updated_at'] = $currentTimestamp;
        
        // echo '<pre>';
        // print_r($data);
        // echo '</pre>';

        DB::table('tbl_guest_confirmations')->insert($data);
        Session::put('message', 'Xác Nhận Tham Dự đã được gửi thành công!');
        return Redirect::to('home');

    }
}
