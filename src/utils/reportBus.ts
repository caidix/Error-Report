/**
 * 消息队列模式--避免多个报错造成异步阻塞
 * img上报方式
 * ajax上报方式
 */

type callbackType = () => unknown;
// type eventsType = { [key: string]: Array<callbackType> };

interface EventBusProps {
  emit(): void;
  on(event: Function): void;
  clear(): void;
  ajaxReport(url: string, data: any): void;
  imageReport(url: string, data: any): void;
  formatParams(data: any): void;
}

export class EventBus implements EventBusProps {
  public events: Array<Function>;
  public isEmit: Boolean;
  public constructor() {
    this.events = [];
    this.isEmit = false;
  }
  public on(event: Function) {
    this.events.push(event);
  }
  public emit(): void {
    const event = this.events[0];
    if (!event) {
      this.isEmit = false;
      return;
    }
    this.isEmit = true;
    event();
    this.events.splice(0, 1);
    this.emit();
  }
  public clear(): void {
    this.events = [];
  }
  public ajaxReport(url: string, data: any, method = "POST") {
    try {
      const dataStr = JSON.stringify(data);
      const xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
      if (method === "POST") {
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.open(method, url, true);
        xhr.send(dataStr);
      } else if (method === "GET") {
        xhr.open("GET", url + "?" + dataStr, true);
        xhr.send();
      }
    } catch (error) {
      console.log(error);
    }
  }
  public imageReport(url: string, data: any) {
    try {
      var img = new Image();
      img.src = url + "?error=" + this.formatParams(data);
    } catch (error) {
      console.log(error);
    }
  }
  public formatParams(data: any) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    return arr.join("&");
  }
}

export const ReportBus = new EventBus();
