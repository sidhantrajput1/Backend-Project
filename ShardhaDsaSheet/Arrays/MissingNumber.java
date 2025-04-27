import java.util.Arrays;

public class MissingNumber {
    static int missNumber(int[] nums) {
        Arrays.sort(nums);
        for(int i = 0; i < nums.length; i++) {
            if(nums[i] != i) return i;
        }
        return nums.length;
    }

    static int missingNumber(int[] nums) {
        int sum = 0;
        for(int i = 0 ; i < nums.length; i++) {
            sum += nums[i];
        }
        int actualSum = (nums.length * (nums.length + 1))/ 2; 
        int missNum = actualSum - sum;
        return missNum;
    }

    public static void main(String[] args) {
        int[] nums = {9,6,4,2,3,5,7,0,1};
        System.out.println(missNumber(nums));
        System.out.println(missingNumber(nums));
    }
}
