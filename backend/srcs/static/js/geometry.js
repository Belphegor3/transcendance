game.geometry = {

    point : {
        posX : 0,
        posY : 0
    },
    angleToRadians : function (angle){
        return angle / 180 * Math.PI;
    },
    angleToDegrees : function (angle){
        return angle * 180 / Math.PI;
      
    },
    lineAngle : function(line){
        return this.angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
    },
    pointTranslate : function(point, angle = 0, distance = 0){
        const r = this.angleToRadians(angle);
        return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
    }
    
}