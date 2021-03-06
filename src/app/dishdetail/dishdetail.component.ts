import { Component, OnInit, Input, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';


import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { visibility, expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  // encapsulation: ViewEncapsulation.None,
  // preserveWhitespaces: false,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand(), visibility()
  ],
})
export class DishdetailComponent implements OnInit {
  @Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  feedbackForm: FormGroup;
  isError = true;
  isSubmit = false;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 5;
  vertical = false;
  private _tickInterval = 1;
  date: string;
  errMess: string;
  visibility = 'shown';

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.visibility = 'shown'; this.dish = dish; this.setPrevNext(dish.id); }, errmess => this.errMess = <any>errmess);
    console.log('called 0');
  }
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    console.log('called 1');
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [''],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  // tslint:disable-next-line:member-ordering
  formErrors = {
    'author': '',
    'rating': '',
    'comment': '',
  };
  onSubmit(formDirective: FormGroupDirective) {
    const d = new Date();
    this.date = d.toISOString();
    this.feedbackForm.value.date = this.date;
    this.dish.comments.push(this.feedbackForm.value);
    console.log(this.feedbackForm.value);


    formDirective.resetForm();
    this.isError = true;
    // this.value = 5;

  }

  // tslint:disable-next-line:member-ordering
  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.',
      'maxlength': 'Comment cannot be more than 25 characters long.'
    },

  };


  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    const d = new Date();
    this.date = d.toISOString();
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control.dirty) {
        const messages = this.validationMessages[field];
        this.isError = true;
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
      if (control.valid && control.dirty) {
        this.isError = false;
      }
    }

  }
  goBack(): void {
    this.location.back();
  }

}
