<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use \stdClass;

class ReadPage extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = $this->count();
        $topWordCount = reset($data);
        return view('main',['data' => $data, 'topWordCount' => $topWordCount]);
    }

    public function count()
    {
        $mbf = File::get(resource_path('text-files\moby-dick.txt'));
        $swf = File::get(resource_path('text-files\stop-words.txt'));

        $stop_words = collect(explode(PHP_EOL, $swf))->map(function ($item, $key) {
            return trim($item);
        });

        $counted = array();

        $lines = explode(PHP_EOL,$mbf);
        foreach($lines as $line) {
            $wordsInLine = explode(' ', $line);
            foreach($wordsInLine as $word) {
                $formatted = strtolower(preg_replace('/[^A-Za-z0-9\-]/', '', $word));
                if($stop_words->search($formatted) === false && $formatted != '') {
                    if(isset($counted[$formatted])) {
                        $counted[$formatted]++;
                    }else{
                        $counted[$formatted] = 1;
                    }
                }
            }
        }

        arsort($counted);
        $data = array_splice($counted, 0, 100);

        return $data;
    }
}
