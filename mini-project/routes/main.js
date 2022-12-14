const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const shell = require("shelljs")

//define schema
var cpuSchema = mongoose.Schema({
	cpu_time : String,
	cpu_percent: Number,
	cpu_Work : Number,
	cpu_freq : String,
	cpu_count : Number
})

//define schema
var memSchema = mongoose.Schema({
	mem_time : String,
	mem_percent : Number,
	mem_total : String,
	mem_avail : String
})

// create model with mongodb collection and schema
var cpu = mongoose.model('cpu', cpuSchema);
var mem = mongoose.model('memory',memSchema);

//list
router.get('/list', function(req, res, next){
    cpu.find({},{'_id':0}).exec(function(err, docc) {
     mem.find({},{'_id':0}).exec(function(err2, docm) {
        if(err) console.log('err')
        res.writeHead(200);
        var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Result</title>
            <meta charset="utf-8">
        </head>
        <body>
            <table border="1" margin: auto; text-align : center;>
            <tr>
                <th>cpu_time</th>
                <th>cpu_percent</th>
                <th>cpu_work</th>
                <th>cpu_freq</th>
                <th>cpu_count</th>
            </tr>
            `;
            for(var i=0; i<docc.length; i++) {
                template += `
                <tr>
                    <th>${docc[i]['cpu_time']}</th>
                    <th>${docc[i]['cpu_percent']}</th>
                    <th>${docc[i]['cpu_Work']}</th>
                    <th>${docc[i]['cpu_freq']}</th>
                    <th>${docc[i]['cpu_count']}</th>
                </tr>
                `;
            }
            template +=`
            </table>
            <table border="1" margin: auto; text-align : center;>
            <tr>
                <th>mem_time</th>
                <th>mem_percent</th>
                <th>mem_total</th>
                <th>mem_avail</th>
            </tr>
	    `;
	    for(var i=0; i<docm.length; i++) {
	    	template += `
		<tr>
                    <th>${docm[i]['mem_time']}</th>
                    <th>${docm[i]['mem_percent']}</th>
                    <th>${docm[i]['mem_total']}</th>
                    <th>${docm[i]['mem_avail']}</th>
	 	</tr>
		`;
	   }
	   template +=`
	   </table>
        </body>
        </html>
        `;
        res.end(template)
	})
    })
})
shell.cd('~')
router.get('/list/start', function(req, res, next){
   shell.exec('sh /data/anew/mini-project/test.sh');
//     setInterval(function() {
//     cpu.find({},{'_id':0}).exec(function(err, docc) {
//      mem.find({},{'_id':0}).exec(function(err2, docm) {
//         if(err) console.log('err')
//         res.writeHead(200);
//         var template = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>Result</title>
//             <meta charset="utf-8">
//         </head>
//         <body>
//             <table border="1" margin: auto; text-align : center;>
//             <tr>
//                 <th>cpu_time</th>
//                 <th>cpu_percent</th>
//                 <th>cpu_work</th>
//                 <th>cpu_freq</th>
//                 <th>cpu_count</th>
//             </tr>
//             `;
//             for(var i=0; i<docc.length; i++) {
//                 template += `
//                 <tr>
//                     <th>${docc[i]['cpu_time']}</th>
//                     <th>${docc[i]['cpu_percent']}</th>
//                     <th>${docc[i]['cpu_Work']}</th>
//                     <th>${docc[i]['cpu_freq']}</th>
//                     <th>${docc[i]['cpu_count']}</th>
//                 </tr>
//                 `;
//             }
//             template +=`
//             </table>
//             <table border="1" margin: auto; text-align : center;>
//             <tr>
//                 <th>mem_time</th>
//                 <th>mem_percent</th>
//                 <th>mem_total</th>
//                 <th>mem_avail</th>
//             </tr>
// 	    `;
// 	    for(var i=0; i<docm.length; i++) {
// 	    	template += `
// 		<tr>
//                     <th>${docm[i]['mem_time']}</th>
//                     <th>${docm[i]['mem_percent']}</th>
//                     <th>${docm[i]['mem_total']}</th>
//                     <th>${docm[i]['mem_avail']}</th>
// 	 	</tr>
// 		`;
// 	   }
// 	   template +=`
// 	   </table>
//         </body>
//         </html>
//         `;
//         res.end(template)
// 	})
//     })
//     },5000);
})
 module.exports = router;

