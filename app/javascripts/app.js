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
donatedetail

window.donate = function(){
  let index= parseInt($("#index").val());
  let address= $("#address").val();
  let amount=parseInt($("#amount").val());

  if(index>=test.targets.length){
    alert("该目标不存在");
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
  }

  test.targets.push({name:targerName,index:test.targets.length,amount:0});


   Donation.deployed().then(function(contractInstance) {

    contractInstance.addTarget(targerName,{from: account}).then(function(v) {
      console.log(v);

    });

  });





}

window.submitVote = function(candidate) {
  let candidateName = $("#candidate-name").val();
  let signature = $("#voter-signature").val();
  let voterAddress = $("#voter-address").val();

  console.log(candidateName);
  console.log(signature);
  console.log(voterAddress);

  $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")

  Donation.deployed().then(function(contractInstance) {
    contractInstance.voteForCandidate(candidateName, voterAddress, signature, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
      let div_id = candidates[candidateName];
      console.log(div_id);
      return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
        console.log(v.toString());
        $("#" + div_id).html(v.toString());
        $("#msg").html("");
      });
    });
  });
}

window.voteForCandidate = function(candidate) {
  let candidateName = $("#candidate").val();

  let msgParams = [
    {
      type: 'string',      // Any valid solidity type
      name: 'Message',     // Any string label you want
      value: 'Vote for ' + candidateName  // The value to sign
    }
  ]

  var from = web3.eth.accounts[0]

  var params = [msgParams, from]
  var method = 'eth_signTypedData'

  console.log("Hash is ");
  console.log(sigUtil.typedSignatureHash(msgParams));

  web3.currentProvider.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    if (err) return console.dir(err)
    if (result.error) {
      alert(result.error.message)
    }
    if (result.error) return console.error(result)
    $("#msg").html("User wants to vote for " + candidateName + ". Any one can now submit the vote to the blockchain on behalf of this user. Use the below values to submit the vote to the blockchain");
    $("#vote-for").html("Candidate: " + candidateName);
    $("#addr").html("Address: " + from);
    $("#signature").html("Signature: " + result.result);
    console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))
  })
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
  // let candidateNames = Object.keys(candidates);
  // for (var i = 0; i < candidateNames.length; i++) {
  //   let name = candidateNames[i];
  let count1;

    Donation.deployed().then(function(contractInstance) {
      contractInstance.targetsCount.call().then(function(v) {
        console.log(v);






      });

    });

  console.log();
    for (var i = 0; i < parseInt(target.message); i++) {

      // Donation.deployed().then(function(contractInstance) {
      //   contractInstance.getTargetName.call(i,{from: account,gas: 3141592}).then(function(v) {
      //   console.log(v);
      //          currentname=v;
      //   });
      //
      //
      // });

      Donation.deployed().then(function(contractInstance) {
        contractInstance.getTargetAmount.call(i,{from: account,gas: 3141592}).then(function(v) {
             test.targets.push({name:currentname,index:i,amount:v});


        });

      });




    }



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
