import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../service/web3.service';
import { BodyService } from './body.service';

declare let require: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers:[Web3Service]
})
export class BodyComponent implements OnInit {

  user:any;
  accounts: string[];
  EthCoin = 0;
  skinsBuy: any;

  buttonDisabled: boolean = false;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(
    private bodyService: BodyService,
    private web3Service: Web3Service
  ) {
    console.log('Constructor: ' + web3Service);
   }

  data = [
    {
        "id": 1,
        "name": "AK-47 Discruptor",
        "name_vendor": "Gilson Bezerra",
        "price": 5,
        "img": "../../assets/img/AK-47-Disruptor-Fantasma.jpg"
    },
    {
        "id": 2,
        "name": "AK-47 Neon Rider",
        "name_vendor": "Gabriel Teixeira",
        "price": 2,
        "img": "../../assets/img/AK-47_Neon_Rider.jpg"
    },
    {
        "id": 3,
        "name": "AK-47 The Empress",
        "name_vendor": "João Vitor",
        "price": 4,
        "img": "../../assets/img/AK-47_The_Empress.jpg"
    },
    {
        "id": 4,
        "name": "AWP Dragon Lore",
        "name_vendor": "Gilson Bezerra",
        "price": 8,
        "img": "../../assets/img/awp"
    },
    {
        "id": 5,
        "name": "AWP Dragon Lore",
        "name_vendor": "Gilson Bezerra",
        "price": 4,
        "img": "../../assets/img/awp"
    },
    {
        "id": 6,
        "name": "AWP Dragon Lore",
        "name_vendor": "Gilson Bezerra",
        "price": 6,
        "img": "../../assets/img/awp"
    }
  ]

  async ngOnInit() {
    this.watchAccount();
    await this.listaSkins();

    this.EthCoin = await this.balance();
    console.log(this.skinsBuy);
  }

  isBuy(id): boolean{
    return this.skinsBuy[id-1] !== '0x0000000000000000000000000000000000000000';
  }


  withdraw(): void{
   if(confirm("Deseja retirar seu dinheiro?")){
    this.web3Service.withDraw();
   } else {
     alert("Operação Cancelada!")
   }
  }

  async balance() {
    const value = await this.web3Service.Balance();
    console.log(value)
    return value;
  }

  deposit(): void{
    this.web3Service.Deposit();
  }

  buy(id, price): void{
    this.web3Service.buy(id, price);
  
  }

  async listaSkins(){
    this.skinsBuy = await this.web3Service.listaSkins();
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      console.log(this.accounts);
    });
  }

}
