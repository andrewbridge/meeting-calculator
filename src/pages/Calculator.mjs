import {css} from "../deps/goober.mjs";
import { mapRefs } from "../deps/vue.mjs";
import { attendeeHourlyCost, attendeeMap, attendees } from "../services/data.mjs";

export const formatCurrency = (rawAmount, currencyCode = 'GBP', options) =>
  Number(rawAmount)
    .toLocaleString(undefined, {
      currency: currencyCode,
      style: 'currency',
      // currencyDisplay: 'narrowSymbol',
      ...options,
    })
    .replace(/[a-zA-Z]/g, ''); // currencyDisplay isn't widely supported enough, remove alphanumeric characters from response

const styles = css``;

export default {
    data: () => ({ results: null }),
    template: `<div class="page-header">
        <div class="container-xl">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Calculator cost of meeting
                    </h2>
                </div>
            </div>
        </div>
    </div>
    <!-- Page body -->
    <div class="page-body ${styles}">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Configure meeting</h3>
                        </div>
                        <form @submit="calculate">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <label class="form-label required">Meeting duration</label>
                                            <input type="number" class="form-control" name="duration" placeholder="Duration" step="0.01">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label required">Attendees</label>
                                            <div class="form-selectgroup">
                                                <label class="form-selectgroup-item" v-for="attendee in attendees" :key="attendee.id">
                                                    <input type="checkbox" name="attendees" :value="attendee.id" class="form-selectgroup-input">
                                                    <span class="form-selectgroup-label">{{attendee.name}}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-end">
                                <button class="btn btn-primary" type="submit">Calculate</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-12" v-if="results !== null">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Meeting cost</h3>
                        </div>
                        <div class="card-body">
                            <table class="table table-transparent table-responsive">
                                <thead>
                                    <tr>
                                        <th>Attendee</th>
                                        <th class="text-end" style="width: 1%">Hourly</th>
                                        <th class="text-end" style="width: 1%">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="attendee in results.attendees" :key="attendee.id">
                                        <td>
                                            <p class="strong mb-1">{{attendee.name}}</p>
                                            <div class="text-muted">{{formatCurrency(attendee.salary)}}</div>
                                        </td>
                                        <td class="text-end">{{formatCurrency(attendee.hourly)}}</td>
                                        <td class="text-end">{{formatCurrency(attendee.final)}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="strong text-end">Total hourly</td>
                                        <td class="text-end">{{formatCurrency(results.total.hourly)}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="font-weight-bold text-uppercase text-end">Total meeting cost</td>
                                        <td class="font-weight-bold text-end">{{formatCurrency(results.total.final)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    computed: mapRefs({ attendees, attendeeMap, attendeeHourlyCost }),
    methods: {
        formatCurrency,
        calculate(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const duration = data.get('duration');
            this.results = { attendees: [], total: { hourly: 0, final: 0 } };
            for (const attendeeId of data.getAll('attendees')) {
                const { id, name, salary } = this.attendeeMap.get(attendeeId);
                const hourlyCost = this.attendeeHourlyCost.get(attendeeId);
                this.results.total.hourly += hourlyCost;
                this.results.attendees.push({ id, name, salary, hourly: hourlyCost, final: hourlyCost * duration });
            }
            this.results.total.final = this.results.total.hourly * duration;
        }
    }
}
