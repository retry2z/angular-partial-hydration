import { Injectable } from "@angular/core";
import { CanMatch } from "@angular/router";
import { ContextService } from "@context";
import { HydrationService } from "src/app/hydration.service";

@Injectable({ providedIn: 'root' })
export class HydrationGuard implements CanMatch {
  // THIS GUARD HANDLES DOWNLOADING CHUNKS ON CLIENT, THATS WHY WE NEED TWO SHELLS

  constructor(private hydration: HydrationService, private context: ContextService) { }

  canMatch(): boolean {
    const { isServer } = this.context.state;
    return isServer ? isServer : this.hydration.isBootstrapped
  }
}
