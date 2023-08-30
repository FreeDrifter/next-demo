type T_EventFunc = (...args: any[]) => void

export class EventEmitter {
    private _eventList: Record<string, T_EventFunc[]> = {}

    on(eventName: string, fn: T_EventFunc) {
        const eventList = this._eventList[eventName] || []
        eventList.push(fn)
        this._eventList[eventName] = eventList
    }

    off(eventName: string, fn: T_EventFunc) {
        const eventList = this._eventList[eventName] || []
        const newEventList: T_EventFunc[] = []
        eventList.forEach((oldFn: T_EventFunc) => {
            if (oldFn !== fn) {
                newEventList.push(oldFn)
            }
        })
        this._eventList[eventName] = newEventList
    }

    emit(eventName: string, ...args: any) {
        const eventList = this._eventList[eventName] || []
        eventList.forEach((fn) => {
            fn && fn(...args)
        })
    }

    clear(eventName?: string) {
        if (eventName) {
            this._eventList[eventName] = []
        } else {
            this._eventList = {}
        }
    }
}