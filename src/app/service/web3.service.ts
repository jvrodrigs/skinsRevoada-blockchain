import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
declare let require: any;
declare let window: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');
import LojaFile from '../../../build/contracts/Loja.json'

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;
  private loja: any;
  private contractAddress: any;

  data: string[];

  public accountsObservable = new Subject<string[]>();

  constructor() {
    this.contractAddress = "0x39180d3DDa00c041b59a15f101887f12Fd9Be179"
    this.bootstrapWeb3();
    this.loja = new this.web3.eth.Contract(LojaFile.abi, this.contractAddress);
  }

  public bootstrapWeb3() {
    if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    this.web3 = new Web3(window.ethereum);
    window.ethereum.enable()
    } else {
      alert('Metamask Off? Porfavor conecte-se')
    }
  }

  public async withDraw() {
    console.log(this.loja.methods.recolhimento().send({
      from: await this.getAccount()
    }).then(receipt => {
      console.log(receipt);
      setTimeout(()=>{
        window.location.reload();
      }, 1000);
    }))
  }

  public async Balance() {
    const value = await this.loja.methods.getBalanco().call();
    return Web3.utils.fromWei(value, 'ether');
  }

  public async listaSkins() {
    this.data = await this.loja.methods.getSkins().call();
    return this.data;
  }

  public async getAccount() {
    let accounts = await this.web3.eth.getAccounts();
    return accounts[0]
  }

  public async Deposit() {
    var amountToSent = "2"
    this.loja.methods.deposito()
      .send({
          from: await this.getAccount(),
          value: this.web3.utils.toWei(amountToSent, "ether"),
      }).then(receipt=> {console.log(receipt)});
  }

  public async buy(id,price){
    var amountToSent = String(price);
    this.loja.methods.compra(id-1)
      .send({
          from: await this.getAccount(),
          value: this.web3.utils.toWei(amountToSent, "ether"),
      }).then(receipt=> {
        console.log(receipt);
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      });
  }
}
