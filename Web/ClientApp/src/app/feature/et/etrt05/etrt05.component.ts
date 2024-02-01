import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '@app/core/services/notify.service';
import { Evaluation } from '@app/models/et/evaluation';
import { ModalService } from '@app/shared/components/modal/modal.service';
import { Etrt05Service } from './etrt05.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'x-etrt05',
  templateUrl: './etrt05.component.html',
  styleUrl: './etrt05.component.scss'
})

export class Etrt05Component {

  evaluations: Evaluation[] = []

  constructor(
    private sv: Etrt05Service,
    private md: ModalService,
    private ms: NotifyService,
    private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.data.subscribe(({ evaluations }) => {
      this.evaluations = evaluations
    })
  }
  search(value?: string) {
    this.sv.list(value).subscribe((evaluations: Evaluation[]) => this.evaluations = evaluations)
  }
  delete(employeeCode: string) {
    this.md.confirm('message.STD00015').pipe(
      filter(confirm => confirm),
      switchMap(() => this.sv.delete(employeeCode)))
      .subscribe((res: any) => {
        this.search()
        this.ms.success('message.STD00016');
      })
}

}
