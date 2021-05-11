import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'quotes' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'quotes',
                loadChildren: () => import('./pages/quotes/quotes.module').then((m) => m.QuotesModule)
            },
            {
                path: 'info/:symbol/:currency',
                loadChildren: () => import('./pages/info/Info.module').then((m) => m.InfoModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
