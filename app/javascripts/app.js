// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { default as ethUtil} from 'ethereumjs-util';
import { default as sigUtil} from 'eth-sig-util';




 import donation_artifacts from '../../build/contracts/Donation.json'

var Donation = contract(donation_artifacts);

let accounts
let account

let candidates = {"Alice": "candidate-1", "Bob": "candidate-2", "Carol": "candidate-3"}
var currentname;
var currentamount;






var test=new Vue({
    el: '#ta',
    data: {
        targets:  [
					]
    }

})
var donate=new Vue({
    el: '#donatedetail',
    data: {
        details:  [


					]
    }

})


window.donate = function(){
  let index= parseInt($("#index").val());
  let address= $("#address").val();
  let amount=parseInt($("#amount").val());

  if(index>=test.targets.length){
    alert("该目标不存在");
      return;
  }

    console.log(index);
    console.log(address);
    console.log(amount);




Donation.deployed().then(function(contractInstance) {


  contractInstance.donate(address,index,amount,{from: account,gas: 3141592}).then(function(v) {


    console.log(v);

  });

});

var message = {from: address, to:account, value: web3.toWei(amount, 'ether')};

   web3.eth.sendTransaction(message, (err, res) => {
      if(err){
        alert("余额不足");
          return;
      }else{
        console.log(res);
        test.targets[index].amount+=amount;

          donate.details.push({target:test.targets[index].name,address:address,amount:amount,transact:res});
      }


   });


}

window.addTarget = function(){



  let targerName= $("#targetname").val();

  if(targerName.length==0){
    alert("请输入捐献目标");
    return;
  }

  test.targets.push({name:targerName,index:test.targets.length,amount:0});


   Donation.deployed().then(function(contractInstance) {

    contractInstance.addTarget(targerName,{from: account}).then(function(v) {
      console.log(v);

    });

  });





}



$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.eb3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Donation.setProvider(web3.currentProvider);








    web3.eth.getAccounts(function (err, accs) {
    if (err != null) {
      alert('There was an error fetching your accounts.')
      return
    }

    if (accs.length === 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
      return
    }

    accounts = accs
    account = accounts[0]

  })



});
